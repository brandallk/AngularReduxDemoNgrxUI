import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {
  private _sections = new BehaviorSubject<any[]>([]);
  sections = this._sections.asObservable();

  private _servers = new BehaviorSubject<any[]>([]);
  servers = this._servers.asObservable();

  private _currentServerId = new BehaviorSubject<any[]>([]);
  currentServerId = this._currentServerId.asObservable();

  private _currentTableOrders = new BehaviorSubject<any[]>([]);
  currentTableOrders = this._currentTableOrders.asObservable();

  constructor(private http: HttpClient) { }

  getSections() {
    this.http.get('http://localhost:60417/api/Sections')
      .subscribe(sections => {
        this.updateSections(sections);
      },
      error => {
        console.log('Error loading restaurant sections:', error);
      });
  }

  updateSections(sections) {
    this._sections.next(sections);
  }

  getServers() {
    this.http.get('http://localhost:60417/api/Servers')
      .subscribe(servers => {
        this.updateServers(servers);
      },
      error => {
        console.log('Error loading restaurant servers:', error);
      });
  }

  updateServers(servers) {
    this._servers.next(servers);
  }

  assignNewTable(sectionId, serverId) {
    this.http.post('http://localhost:60417/api/Tables', { SectionId: sectionId, ServerId: serverId }).subscribe(() => {
        this.http.patch('http://localhost:60417/api/Servers/' + serverId + '/Update', { change: '1' }).subscribe(() => {
          this.getSections();
        }, () => {
          console.log('Could not update the server for the new table');
        });
    }, () => {
      console.log('Could not post the new table');
    });
  }

  removeTable(tableId, serverId) {
    this.http.delete('http://localhost:60417/api/Tables/' + tableId).subscribe(() => {
        this.http.patch('http://localhost:60417/api/Servers/' + serverId + '/Update', { change: '-1' }).subscribe(() => {
          this.getSections();
        }, () => {
          console.log('Could not update the server for the deleted table');
        });
    }, () => {
      console.log('Could not delete the table');
    });
  }

  getTableOrders(tableId) {
    this.http.get('http://localhost:60417/api/Tables/' + tableId + '/Orders')
    .subscribe((tableOrders: any) => {
      this.updateCurrentTableOrders(tableOrders.Orders);
      this.updateCurrentServerId(tableOrders.ServerId);
    },
    error => {
      console.log('Error loading current table orders:', error);
    });
  }

  updateCurrentTableOrders(orders) {
    this._currentTableOrders.next(orders);
  }

  updateCurrentServerId(id) {
    this._currentServerId.next(id);
  }

  removeOrder(tableId, orderId) {
    this.http.delete('http://localhost:60417/api/Orders/' + orderId).subscribe(() => {
      this.getTableOrders(tableId);
    }, () => {
      console.log('Could not delete the order');
    });
  }

  addOrder(orderDetail) {
    this.http.post('http://localhost:60417/api/Orders/', orderDetail).subscribe(() => {
      this.getTableOrders(orderDetail.TableId);
    }, () => {
      console.log('Could not post the order');
    });
  }

}
