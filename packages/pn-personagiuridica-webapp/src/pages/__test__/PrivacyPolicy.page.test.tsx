import { vi } from 'vitest';

import { compileOneTrustPath } from '@pagopa-pn/pn-commons';

import { render } from '../../__test__/test-utils';
import PrivacyPolicyPage from '../PrivacyPolicy.page';

describe('test the Privacy Policy page', () => {
  const loadNoticesFn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.OneTrust = {
      NoticeApi: {
        Initialized: {
          then: (cbk: () => void) => {
            cbk();
          },
        },
        LoadNotices: loadNoticesFn,
      },
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('check that Privacy Policy page container is rendered', () => {
    const result = render(<PrivacyPolicyPage />);
    expect(loadNoticesFn).toHaveBeenCalledTimes(1);
    expect(loadNoticesFn).toHaveBeenCalledWith([compileOneTrustPath('mocked-id')], false);
    expect(result.getByRole('article')).toBeInTheDocument();
  });
});
