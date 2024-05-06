import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class TableColumsService {

  constructor() { }

  getTasksColumns(): PoTableColumn[] {
    const tableColumns = [
    {property: 'title', label:'Título'},
    {property: 'completed', label: 'Finalizada', type: 'boolean'},
    {property: 'completedAt', label: 'Data de finalização', type: 'dateTime'},
    {property: 'createdAt', label: 'Data de criação', type: 'dateTime'}
  ]
    return tableColumns as PoTableColumn[]
  }
}
