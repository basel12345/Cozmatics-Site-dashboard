
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeService } from '../../shared/service/attribute/attribute.service';

@Component({
  selector: 'app-attributes-values',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, CheckboxModule, FormsModule],
  templateUrl: './attributes-values.component.html',
  styleUrl: './attributes-values.component.css'
})
export class AttributesValuesComponent {

  AttrValues: any;
	constructor(
		private attrService: AttributeService,
		public sanitizer: DomSanitizer,
		private toastr: ToastrService,
		private router: Router, 
    private route: ActivatedRoute,
	) { }
  productId :any;
  ProductName :any;
	ngOnInit(): void {

    this.route.params.subscribe(res => {
			this.productId = res["ProductId"];
      this.ProductName = res["ProductName"];
			if (this.productId)
			this.getAllAttrValues();
		});
	}

	getAllAttrValues() {
		this.attrService.getAttrValueByProductid(this.productId).subscribe(res => {
			this.AttrValues = res;
		});
	}
	

	deleteAttrVal(id: number) {
		this.attrService.deleteAttrValue(id).subscribe(res => {
			this.toastr.success('attribute is Deleted', 'Success');
      this.getAllAttrValues();
		})
	}

	navigateToAddAttr() {
		this.router.navigate([`AttributeValue/${this.productId}/${this.ProductName}/0`]);
	}

	navigateToEditAttr(id: number) {
    this.router.navigate([`AttributeValue/${this.productId}/${this.ProductName}/${id}`]);
	}
}
