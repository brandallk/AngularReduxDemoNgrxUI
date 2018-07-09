import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { OrderManagerService } from '../../services/order-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() tableId;
  @Input() serverId;

  constructor(
    public activeModal: NgbActiveModal,
    private orderManagerService: OrderManagerService
  ) { }

  ngOnInit() {
  }

  deleteTable() {
    this.orderManagerService.removeTable(this.tableId, this.serverId);
    this.activeModal.close('Assign click');
  }

}
