import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../../base-page';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';

@Component({
  selector: 'page-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class PageFilterTableComponent extends BasePageComponent implements OnInit, OnDestroy {
  tableData: any[];
  activeUsers: any;
  inactiveUsers: any;
  allactiveUsers: any;
  tempData: any;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Filtering tables',
      loaded: true,
      breadcrumbs: [
        {
          title: 'UI Kit',
          route: 'default-dashboard'
        },
        {
          title: 'Tables',
          route: 'default-dashboard'
        },
        {
          title: 'Filtering'
        }
      ]
    };
    this.tableData = [];
    this.activeUsers = (input) => {
      const is = field => item => ( item[field] === 'active' );
      return input.filter(is('status'));
    }
    this.inactiveUsers = (input) => {
      console.log(input);
      const is = field => item => ( item[field] === 'inactive' );
      return input.filter(is('status'));
    }
    this.allactiveUsers = (input) => {
      const is = field => item => ( (item[field] === 'inactive'
      || item[field] === 'active') );
      return input.filter(is('status'));
    }
	}

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/table-sorting.json', 'tableData', "loadData");
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  filterTbl(str) {
    let temp: any;
    temp = this.tableData;
    // this.tableData = this.tableData.filter((data) => {
    //   return data.status === str;
    // });
    if(str === 'active') {
      this.tableData = this.activeUsers(this.tempData);
      // console.log(JSON.stringify(this.activeUsers(this.tableData)));
    } else if(str === 'inactive') {
      this.tableData = this.inactiveUsers(this.tempData);
      // console.log(JSON.stringify(this.inactiveUsers(this.tableData)));
    } else {
      this.tableData = this.allactiveUsers(this.tempData);
      // console.log(JSON.stringify(this.allactiveUsers(this.tableData)));
    }
  }
  loadData() {
    this.tempData = this.tableData;
    this.tableData = this.activeUsers(this.tempData);
  }
}
