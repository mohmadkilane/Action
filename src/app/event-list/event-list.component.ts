import { AddActionService } from 'src/app/Service/add-action.service';
import { EventsService } from './../Service/events.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { AddActionsComponent } from './add-actions/add-actions.component';
import { NewAction, EventsInstance } from '../Model/EventsList.model';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class EventListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['id', 'app', 'defectSeverity', 'condition', 'threshold', 'severity', 'action', 'solution', 'description', 'edit'];
public events;
eventsAct: EventsInstance[];
_Critical: String = 'critical';
_Warning: String = 'warning';
_Error: String = 'error';
  constructor(private eventService: EventsService,
    private dialog: MatDialog,
    private newAction: AddActionService) { }
  ngOnInit() {
    this.getEvents2();
   // this.eventService.getPosts().subscribe(data => this.events = data);
   this.eventService.getPosts().subscribe(data => {
    if (!data) {
      return;
    }
   // this.events = data;
    this.events = new MatTableDataSource(data);
    this.events.sort = this.sort;
    this.events.paginator = this.paginator;
  });
  }
  getEvents2(): void {
    this.eventService.getPosts()
    .subscribe(ev => this.eventsAct = ev);
  }
  OnAdd() {
    this.newAction.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '100%';
    this.dialog.open(AddActionsComponent, dialogConfig);
   }
   onEdit(row) {
      this.newAction.populateForm(row);
      const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.height = '100%';
    this.dialog.open(AddActionsComponent, dialogConfig);
   }
   onDelete(action: EventsInstance): void {
     if (confirm('Are You Sure to delete this record?')) {
// this.newAction.deleteAction(action);
      this.eventsAct = this.eventsAct.filter(h => h !== action);
  this.eventService.deleteAction(action).subscribe();
     }
   }
}