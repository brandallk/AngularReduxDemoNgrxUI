import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { OrderManagerService } from '../../services/order-manager.service';
import { Observable } from 'rxjs';
import { faPlusCircle, faMinusCircle, faUtensils, faBeer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-orders-modal',
  templateUrl: './view-orders-modal.component.html',
  styleUrls: ['./view-orders-modal.component.css']
})
export class ViewOrdersModalComponent implements OnInit {
  @Input() tableId;
  orders: Observable<any[]>;
  serverId: any;
  mealDescription: string;
  drinkDescription: string;

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faUtensils = faUtensils;
  faBeer = faBeer;

  constructor(
    public activeModal: NgbActiveModal,
    private orderManagerService: OrderManagerService
  ) {
    this.orders = orderManagerService.currentTableOrders;
  }

  ngOnInit() {
    this.orderManagerService.getTableOrders(this.tableId);
    this.orderManagerService.currentServerId.subscribe(id => {
      this.serverId = id;
    });
  }

  AddOrder() {
    const orderDetail = {
      TableId: this.tableId,
      ServerId: this.serverId,
      MealItems: [
        {
          Name: this.mealDescription
        }
      ],
      DrinkItems: [
        {
          Name: this.drinkDescription
        }
      ]
    };
    this.orderManagerService.addOrder(orderDetail);
  }

  removeOrder(order) {
    this.orderManagerService.removeOrder(this.tableId, order.Id);
  }

}
