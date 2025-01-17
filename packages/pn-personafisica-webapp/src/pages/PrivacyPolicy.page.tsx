import { useEffect } from 'react';

import { compileOneTrustPath, rewriteLinks, waitForElement } from '@pagopa-pn/pn-commons';

import * as routes from '../navigation/routes.const';
import { getConfiguration } from '../services/configuration.service';

declare const OneTrust: {
  NoticeApi: {
    Initialized: {
      then: (cbk: () => void) => void;
    };
    LoadNotices: (noticesUrls: Array<string>, flag: boolean) => void;
  };
};

const PrivacyPolicyPage: React.FC = () => {
  const configuration = getConfiguration();
  const pp = configuration.ONE_TRUST_PP;
  const draft = configuration.ONE_TRUST_DRAFT_MODE;
  const route = routes.PRIVACY_POLICY;

  useEffect(() => {
    if (pp) {
      OneTrust.NoticeApi.Initialized.then(function () {
        OneTrust.NoticeApi.LoadNotices([compileOneTrustPath(pp, draft)], false);

        void waitForElement('.otnotice-content').then(() => {
          rewriteLinks(route, '.otnotice-content a');
        });
      });
    }
  }, []);

  return (
    <>
      <div role="article" id={`otnotice-${pp}`} className="otnotice"></div>
    </>
  );
};

export default PrivacyPolicyPage;
