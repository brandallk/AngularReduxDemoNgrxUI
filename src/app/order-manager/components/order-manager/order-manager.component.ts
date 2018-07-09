import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderManagerService } from '../../services/order-manager.service';
import { faPlusCircle, faMinusCircle, faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTableModalComponent } from '../add-table-modal/add-table-modal.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ViewOrdersModalComponent } from '../view-orders-modal/view-orders-modal.component';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {
  sections: Observable<any[]>;

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faPencilAlt = faPencilAlt;
  faEye = faEye;

  constructor(
    private orderManagerService: OrderManagerService,
    private modalService: NgbModal
  ) {
    this.sections = orderManagerService.sections;
  }

  ngOnInit() {
    this.orderManagerService.getSections();
  }

  addTable(section) {
    this.launchAddTableModal(section);
  }

  removeTable(table) {
    this.launchConfirmationModal(table);
  }

  editOrders(table) {
    this.launchViewOrdersModal(table);
  }

  launchAddTableModal(section) {
    const modalRef = this.modalService.open(AddTableModalComponent);
    modalRef.componentInstance.section = section;
  }

  launchConfirmationModal(table) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.tableId = table.Id;
    modalRef.componentInstance.serverId = table.ServerId;
  }

  launchViewOrdersModal(table) {
    const modalRef = this.modalService.open(ViewOrdersModalComponent);
    modalRef.componentInstance.tableId = table.Id;
  }

}
