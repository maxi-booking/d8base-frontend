import {Injectable} from '@angular/core';
import {OrderModel, OrderPostModel} from '@app/core/models/order-model';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersApiService {

    private readonly url = environment.backend.orders;

    constructor(private readonly client: ApiClientService) {
    }

    public postNewOrder(order: OrderPostModel): Observable<OrderModel> {
        return this.client.post<OrderModel, OrderPostModel>(this.url, order);
    }
}
