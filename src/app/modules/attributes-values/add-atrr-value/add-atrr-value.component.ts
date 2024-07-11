import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { BrandsService } from '../../../shared/service/brands/brands.service';
import { AttributeService } from '../../../shared/service/attribute/attribute.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-add-atrr-value',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './add-atrr-value.component.html',
  styleUrl: './add-atrr-value.component.css'
})
export class AddAtrrValueComponent {

  attrValue: any;
  attrValueForm!: FormGroup;
  AttrType: any
  submitted: boolean = false;
  productId: any;
  ProductName: any;
  brandsService: any;
  AttrId: any;
  constructor(
    private route: ActivatedRoute,
    private attrService: AttributeService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }
  id!: number;
  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(res => {
      this.productId = res["ProductId"];
      this.ProductName = res["ProductName"];
      this.AttrId = res["AttrId"];
      if (this.AttrId)
        this.getAtrrValueByid(this.AttrId);
    });
    this.AttrType = [{id:1, name:"Color"} , {id:2, name:"Size"}]

  }

  initForm() {
    this.attrValueForm = this.fb.group({
      attributeId: [null, Validators.required],
      productId: [null, Validators.required],
      qty: [1, Validators.required],
      value: ["", Validators.required]
    })
  }

  getAtrrValueByid(id: number) {
    this.attrService.getAttrValueById(id).subscribe(res => {
      this.attrValue = res;
      this.attrValueForm.patchValue(this.attrValue);
    })
  }


  SaveData() {
    this.attrValueForm.controls['productId'].patchValue( Number(this.productId));
    if (this.attrValueForm.invalid) {
      this.submitted = true;
      return;
    }
    let body = {
      "attributeId": Number( this.attrValueForm.getRawValue()['attributeId']),
      "productId": Number(this.productId),
      "qty": Number(this.attrValueForm.getRawValue()['qty']),
      "value": this.attrValueForm.getRawValue()['value']
    };

    if (this.AttrId != '0') {
      this.attrService.editAttrValue({ id: Number(this.AttrId), ...body }).subscribe(res => {
        this.toastr.success('Attribute is Updated', 'Success');
        this.router.navigate([`AttributeValue/${this.productId}/${this.ProductName}`]);
        this.submitted = false;
      })
    } else {
      this.attrService.addAttrValue(body).subscribe(res => {
        this.toastr.success('Attribute value is Saved', 'Success');
        this.router.navigate([`AttributeValue/${this.productId}/${this.ProductName}`]);
        this.submitted = false;
      },error=>{
        this.toastr.error(error.error.msg);
      })
    }
  }

}
