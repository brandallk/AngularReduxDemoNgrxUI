import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { OrderManagerService } from '../../services/order-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-table-modal',
  templateUrl: './add-table-modal.component.html',
  styleUrls: ['./add-table-modal.component.css']
})
export class AddTableModalComponent implements OnInit {
  @Input() section;
  sectionName: string;
  tablesFilled: number;
  tablesAvailable: number;
  servers: Observable<any[]>;
  selectedServerId: number;

  constructor(
    public activeModal: NgbActiveModal,
    private orderManagerService: OrderManagerService
  ) {
    this.servers = orderManagerService.servers;
  }

  ngOnInit() {
    this.sectionName = this.section.Name;
    this.tablesFilled = this.section.Tables.length;
    this.tablesAvailable = this.section.TableCount - this.tablesFilled;
    this.orderManagerService.getServers();
  }

  assign() {
    this.orderManagerService.assignNewTable(this.section.Id, this.selectedServerId);
    this.activeModal.close('Assign click');
  }

  report(value) {
    console.log(value);
  }

}
