import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { ConfirmService } from '../_services/confirm.service';
import {MessageService} from '../_services/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages: Message[] = [];
pagination: Pagination;
container ='Unread';
pageSize =5;
pageNumber =1;
loading = false;

  constructor(private messageService: MessageService, private confirmService: ConfirmService ) { 


  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe(response =>{
    
      this.messages = response.result;
      this.pagination = response.pagintaion;
      this.loading = false;
    }
    );

  }

  deleteMessage(id:number){
    this.confirmService.confirm('Confirm delete message','This cannot be undone').subscribe(result =>{
      if(result){
        this.messageService.deleteMessage(id).subscribe(()=>{
          this.messages.splice(this.messages.findIndex(m=>m.id === id),1);
              });
      }
    })

  }


  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadMessages();
  }

}
