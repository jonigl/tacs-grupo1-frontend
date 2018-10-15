import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { AlarmService } from 'src/app/_services/alarm.service';
import { AlarmRequest } from 'src/app/_models';
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector: 'app-alarm-dialog',
    templateUrl: './alarm-dialog.component.html',
    styleUrls: ['./alarm-dialog.component.css']
})
export class AlarmDialogComponent implements OnInit {

    alarmFormGroup: FormGroup;

    nameControl: FormControl = new FormControl('', Validators.required);
    private keywordControl: FormControl = new FormControl('');
    private addressControl: FormControl = new FormControl('');
    private priceControl: FormControl = new FormControl('');

    private dateFrom: Date = null;
    private dateTo: Date = null;

    constructor(
        private formBuilder: FormBuilder,
        private alarmService: AlarmService,
        public dialogRef: MatDialogRef<AlarmDialogComponent>,
        private snackbar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: Event) { }

    ngOnInit() {
        this.initAlarmForm();
    }

    initAlarmForm() {
        this.alarmFormGroup = this.formBuilder.group({
            nameControl: this.nameControl,
            keywordControl: this.keywordControl,
            addressControl: this.addressControl,
            priceControl: this.priceControl
        });
    }

    onSubmit() {
        if (this.alarmFormGroup.invalid) {
            return;
        }

        const alarmRequest = this.getUserRequestFromForm();
        const valid = alarmRequest.keyword ||
            alarmRequest.address ||
            alarmRequest.price ||
            alarmRequest.startDateFrom ||
            alarmRequest.startDateTo;

        if (!valid) {
            this.snackbar.open(`You must set at least one of filters.`, '', { duration: 3000 });
            return;
        }

        this.alarmService.add(alarmRequest)
            .pipe(first())
            .subscribe(alarm => {
                this.snackbar.open(`New alarm "${alarm.name}" added.`, '', { duration: 3000 });
                this.dialogRef.close(true);
            });
    }

    getUserRequestFromForm(): AlarmRequest {
        return {
            name: this.nameControl.value.toString(),
            keyword: this.keywordControl.value.toString(),
            address: this.addressControl.value.toString(),
            price: this.priceControl.value.toString(),
            startDateFrom: this.dateFrom,
            startDateTo: this.dateTo
        };
    }

    setDateFrom(event: MatDatepickerInputEvent<Date>) {
        this.dateFrom = event.value;
    }

    setDateTo(event: MatDatepickerInputEvent<Date>) {
        this.dateTo = event.value;
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }
}
