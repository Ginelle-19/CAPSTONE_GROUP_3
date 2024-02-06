import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facility-crud',
  templateUrl: './facility-crud.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./facility-crud.component.css'],
  standalone: true
})
export class FacilityCrudComponent {
  RoomsArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  RoomName: string = "";
  RoomDesc: string = "";
  RoomStatus: string = "";
  currentRoom: any;

  constructor(private http: HttpClient) {
    this.getAllRooms();
  }

  getAllRooms() {
    this.http.get("http://localhost:8085/api/room")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.RoomsArray = resultData.data;
      });
  }

  addRooms() {
    let bodyData = {
      "RoomName": this.RoomName,
      "RoomDesc": this.RoomDesc,
      "RoomStatus": this.RoomStatus
    };

    this.http.post("http://localhost:8085/api/room/add", bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Room Added Successfully!");
        this.getAllRooms();
      });
  }

  setUpdate(data: any) {
    this.RoomName = data.RoomName;
    this.RoomDesc = data.RoomDesc;
    this.RoomStatus = data.RoomStatus;
  }
  toggleActive(currentRoom: any) {
    if (currentRoom && currentRoom.RoomStatus !== undefined) {
      currentRoom.RoomStatus = currentRoom.RoomStatus === 1 ? 0 : 1;
      this.UpdateRecords(currentRoom.RoomID);
    } else {
      console.error('currentRoom is undefined or does not have an RoomStatus property');
    }
  }
  
  UpdateRecords(currentRoom:any) {
    let bodyData = {
      "RoomName": this.RoomName,
      "RoomDesc": this.RoomDesc,
      "RoomStatus": this.RoomStatus
    };
  
    this.http.put("http://localhost:8085/api/room/update" + "/" + currentRoom.RoomID, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert("Room Updated Successfully!");
        this.getAllRooms();
      });
  }
  
  save() {
    if (this.currentRoom && this.currentRoom.RoomID !== '') {
      this.UpdateRecords(this.currentRoom);
    } else {
      this.addRooms();
    }
  }

  deleteRoom(room: any) {
    this.http.delete("http://localhost:8085/api/room/delete/" + room.RoomID)
      .subscribe(
        () => {
          console.log("Room Deleted Successfully!");
          this.getAllRooms();
        },
        (error) => {
          console.error("Error deleting room:", error);
          alert("Failed to delete room. Please try again later.");
        }
      );
  }
}
