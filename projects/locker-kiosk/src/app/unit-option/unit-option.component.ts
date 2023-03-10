import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { SubcategoryDTO, UnitDTO, ItemDTO, ContainerDTO } from 'src/app/shared/model';
import { DataService } from '../data.service'
import { Router } from '@angular/router';
import { delay } from 'q';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-unit-option',
  templateUrl: './unit-option.component.html',
  styleUrls: ['./unit-option.component.scss']
})
export class UnitOptionComponent implements OnInit {
  units: UnitDTO[] = [];
  ItemId: string;
  Item: ItemDTO;
  LockerId: number;
  LockerName: string;
  lang: string;
  chooseLocker: string;
  cardNumber: string;
  containerName: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alrt: AlertService,
    private data: DataService
  ) {
    this.data.currentMessage.subscribe(message => this.ItemId = message);
    this.data.currentLanguage.subscribe(language => this.lang = language)
    this.data.currentBadgeId.subscribe(badgeId => this.cardNumber = badgeId);
    this.data.currentLocker.subscribe(contner => this.containerName = contner);
  }

  ngOnInit() {
    this.http.get<ItemDTO>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/items/${this.ItemId}`).subscribe(data => {
      console.log(data)
      this.Item = data;
    }
    )
    this.data.currentLocker.subscribe(data => {
      this.http.get<ContainerDTO>(`https://smartlocker20220922110147.azurewebsites.net/api/admin/containers/name/${data}`).subscribe(id => {
        this.LockerId = id.id;
        this.LockerName = data;
      })
    })

    let params = new HttpParams();
    if (this.ItemId) {
      params = params.append('itemId', this.ItemId);

    }
    this.http.get<Array<UnitDTO>>('https://smartlocker20220922110147.azurewebsites.net/api/admin/units/item', { params: params }).subscribe(data => {
      let tempUnits = data;
          document.getElementById("body").innerHTML = "";
          tempUnits.forEach(element => {
            if(element.loaner.employeeId == null)  {
              this.units.push(element);
            }
          console.log(this.units);
          });
    }

    )
  }

  openLocker(l) {
    this.chooseLocker = l;
    if (this.lang == "thai") {
      document.getElementById("unit-choice").innerHTML = "??????????????????????????????????????????";
    } else {
      document.getElementById("unit-choice").innerHTML = "Processing, please wait.";
    }

    console.log("choose: " + this.chooseLocker);
    var showNumber = this.chooseLocker.substring(7);
    this.http.get("https://smartlocker20220922110147.azurewebsites.net/api/admin/lockerno/" + this.containerName + "/" + this.chooseLocker).subscribe(
      data => {
        IsAvailable = data;
        console.log(IsAvailable);
        if (this.cardNumber == "85203721_226000") {
          this.http.get(Url + showNumber).subscribe(
            data => {
              console.log(data);
            }
          )
        }
        else if (IsAvailable.loaner.employeeId == null) {
          this.http.post<UnitDTO>("https://smartlocker20220922110147.azurewebsites.net/api/admin/borrow/" + IsAvailable.barcode,{"BadgeId": this.cardNumber}).subscribe(
            data => {
              let returnday = data.item.defaultDuration/(24*60*60);
              // this.alrt.dateAlert("???????????????????????????????????????????????????????????? " + returnday +" ????????? Please return the item in "+ returnday +" days",10000);
              console.log(data);
              this.http.get(Url + showNumber).subscribe(
                data => {
                  console.log(data);
                  this.checkLocker();
                }
              )
            }
          )
          
          if (this.lang == "thai") {
            document.getElementById("unit-choice").innerHTML = "???????????????????????????????????????????????????????????????????????????";
          } else {
            document.getElementById("unit-choice").innerHTML = "Pick your item and close the door.";

          }
          document.getElementById("unit-choice").style.fontSize = "calc((.3em + 1vmin) + (.3em + 1vmax))"

        }
        else {
          if (this.lang == "thai") {
            document.getElementById("unit-choice").innerHTML = "??????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????";
          } else {
            document.getElementById("unit-choice").innerHTML = "Item is not available.Please enter again";
          }
          // alert("this item is not available");
          this.chooseLocker = "";
        }
      }
    )
  }

  checkLocker() {
    delay(3000);
    var showNumber = this.chooseLocker.substring(7);
    this.http.get(Urlcheck + showNumber).subscribe(
      data => {
        detail = data;
        console.log("detail is " + detail.result);
        //datail.result = 1;
        if (detail.result == 1) {
          // alert("close")
          // alert("Thank you " + this.card_number + " Don't forget to logout");
          // this.alert_message();
          this.router.navigate(['/browse-option'])
        }
        console.log(data);
      }
    )
    this.chooseLocker = "";
  }

  alert_message() {
    if (this.lang == "thai") {
      alert("?????????????????? " + this.cardNumber + " ???????????????????????????????????????????????????")
    }
    else {
      alert("Thank you " + this.cardNumber + " Don't forget to logout");
    }
  }

}
var detail;
var IsAvailable;
const Url = '/lockers/open/';
const Urlcheck = '/lockers/checkclose/';

