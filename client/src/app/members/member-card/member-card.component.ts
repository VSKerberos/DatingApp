import { Component, Input, OnInit } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import {Member } from '../../_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
@Input() member:Member;
  constructor() { }

  ngOnInit(): void {
  }

}
