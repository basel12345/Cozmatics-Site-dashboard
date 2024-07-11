import { inject } from '@angular/core';
import {
	HttpRequest,
	HttpHandlerFn,
	HttpEvent,
	HttpResponse,
} from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { LoadingService } from '../../../shared/service/loading/loading.service';

export function authInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
	const loadingService = inject(LoadingService);
	return handleLoad();

	function handleLoad() {
		loadingService.appearLoading();
		return next(request).pipe(finalize(() => {
			loadingService.hideLoading();
		}));
	}
}

