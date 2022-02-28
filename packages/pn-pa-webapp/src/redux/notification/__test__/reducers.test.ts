import MockAdapter from 'axios-mock-adapter';

import { apiClient } from '../../../api/axios';
import { exchangeToken, logout } from '../../auth/actions';
import { loginInit } from '../../auth/__test__/reducers.test';
import { store } from '../../store';
import { getSentNotification, getSentNotificationDocument } from '../actions';
import { NotificationDetail } from '../types';

const notification = {
	iun: 'c_b963-220220221119',
	paNotificationId: '220220221119',
	subject: 'Prova - status',
	sentAt: '2022-02-21T10:19:33.440Z',
	cancelledIun: null,
	cancelledByIun: null,
	recipients: [{
		taxId: 'CGNNMO80A03H501U',
		denomination: 'Analogico Ok',
		digitalDomicile: null,
		physicalAddress: {
			at: 'Presso qualcuno',
			address: 'In via del tutto eccezionale',
			addressDetails: 'scala A',
			zip: '00100',
			municipality: 'Comune',
			province: 'PROV',
			foreignState: null
		}
	}],
	documents: [{
		digests: {
			sha256: '3b56e2b5641d5807fa83d6bc906a35135a6b8b7c21e694b859bbafc3d718d659'
		},
		contentType: 'application/pdf'
	}],
	payment: null,
	notificationStatus: 'RECEIVED',
	notificationStatusHistory: [{
		status: 'RECEIVED',
		activeFrom: '2022-02-22T10:19:33.440Z'
	}],
	timeline: [],
	physicalCommunicationType: 'REGISTERED_LETTER_890'
};

const mockNtificationDetailResponse = (iun: string) => {
  const mock = new MockAdapter(apiClient);
  mock.onGet(`/delivery/notifications/sent/${iun}`).reply(200, notification);
}

const mockNtificationDetailDocumentResponse = (iun: string, documentIndex: number) => {
  const mock = new MockAdapter(apiClient);
  mock.onGet(`/delivery/notifications/sent/${iun}/documents/${documentIndex}`).reply(200, '');
}

loginInit();

describe('Notification detail redux state tests', () => {
  
  it('Initial state', () => {
    const state = store.getState().notificationState;
    expect(state).toEqual({
      loading: false,
      notification: {
				iun: '',
				paNotificationId: '',
				subject: '',
				sentAt: '',
				cancelledIun: '',
				cancelledByIun: '',
				recipients: [],
				documents: [],
				payment: {},
				notificationStatus: '',
				notificationStatusHistory: [],
				timeline: [],
				physicalCommunicationType: ''
			}
    });
  });

  it('Should be able to fetch the notification detail', async () => {
    await store.dispatch(exchangeToken('mocked-token'));
    mockNtificationDetailResponse('mocked-iun');
    const action = await store.dispatch(getSentNotification('mocked-iun'));
    const payload = action.payload as NotificationDetail;
    expect(action.type).toBe('getSentNotification/fulfilled');
    expect(payload).toEqual({...notification, sentAt: '21/02/2022'});
    await store.dispatch(logout());
  });

	it('Should be able to fetch the notification document', async () => {
    await store.dispatch(exchangeToken('mocked-token'));
    mockNtificationDetailDocumentResponse('mocked-iun', 0);
    const action = await store.dispatch(getSentNotificationDocument({iun: 'mocked-iun', documentIndex: 0}));
    const payload = action.payload;
    expect(action.type).toBe('getSentNotificationDocument/fulfilled');
    expect(payload).toEqual('');
    await store.dispatch(logout());
  })
});