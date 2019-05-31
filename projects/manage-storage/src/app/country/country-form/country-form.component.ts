import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryDTO } from 'src/app/shared/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {
  countryId: string;
  country: CountryDTO = new CountryDTO();

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.countryId = this.route.snapshot.paramMap.get('countryId');
    if(this.countryId != null) {
      this.http.get<CountryDTO>(`http://52.163.226.37/api/admin/countries/${this.countryId}`).subscribe(data => {
        console.log(data)
        this.country = data;
      })
    }

  }

  submitForm() {
    let endpoint: string;
    if(this.countryId != null) {
      endpoint = `http://52.163.226.37/api/admin/countries/${this.countryId}`
     } else {
      endpoint = `http://52.163.226.37/api/admin/countries`
     }

    this.http.post<any>(endpoint, {
      "name": this.country.name
    }).subscribe(data => {
      this.router.navigate(['/countries'])
    })
  }


}
