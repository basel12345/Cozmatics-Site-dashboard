import { ShipmentCostService } from './../../../shared/service/shipment-cost/shipment-cost.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-shipment-cost',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './add-shipment-cost.component.html',
  styleUrl: './add-shipment-cost.component.css'
})
export class AddShipmentCostComponent {
  shipmentCost: any;
  ShipmentForm!: FormGroup;
  submitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private shipmentCostService: ShipmentCostService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }
  id!: number;
  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(res => {
      this.id = res["id"];
      if (this.id) {
        this.getShipmentCostById(this.id);
        this.ShipmentForm.get("area")?.disable();
        this.ShipmentForm.get("areaAr")?.disable();
      }
    });
  }
  initForm() {
    this.ShipmentForm = this.fb.group({
      area: ["", Validators.required],
      areaAr: ["", Validators.required],
      city: ["Riyadh", Validators.required],
      cityAr: ["الرياض", Validators.required],
      cost: [null, Validators.required],
    });
    this.ShipmentForm.get("city")?.disable();
    this.ShipmentForm.get("cityAr")?.disable();
  }

  getShipmentCostById(id: number) {
    this.shipmentCostService.getShipmentCostById().subscribe(res => {
      this.shipmentCost = res?.flat()?.find((data: any) => data.id === +this.id);
      this.ShipmentForm.patchValue(this.shipmentCost);
    })
  }


  SaveData() {
    const parentId = this.ShipmentForm.get("parentId")?.getRawValue();
    if (parentId) this.ShipmentForm.get("parentId")?.patchValue(+parentId);
    if (this.ShipmentForm.invalid) {
      this.submitted = true;
      return;
    }
    if (this.id) {
      this.shipmentCostService.editShipmentCost({ id: this.id, ...this.ShipmentForm.getRawValue() }).subscribe(res => {
        this.toastr.success('Shipment Cost is Updated', 'Success');
        this.router.navigate(['shipment-cost']);
        this.submitted = false;
      })
    } else {
      this.shipmentCostService.addShipmentCost(this.ShipmentForm.getRawValue()).subscribe(res => {
        this.toastr.success('Shipment Cost is Saved', 'Success');
        this.router.navigate(['shipment-cost']);
        this.submitted = false;
      })
    }
  }
}
