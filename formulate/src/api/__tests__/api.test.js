import { createFormNode } from '../../datastructures/formNode';
import useLink from '../useLink';

describe('useLink', () => {
  it('provides the link content', () => {
    const initialFormData = 'I am a form';

    const link = createFormNode(initialFormData);
    const linkContent = useLink(link);

    const mockLinkContent = {
      value: 'I am a form',
      error: null,
    };

    expect(linkContent).toMatchObject(mockLinkContent);
  });
});
