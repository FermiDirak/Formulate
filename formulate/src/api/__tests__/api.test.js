import { createFormNode } from '../../datastructures/formNode';
import Reference from './../../datastructures/reference';
import useLink from '../useLink';

describe('useLink', () => {
  it('provides the link content', () => {
    const initialFormData = 'I am a form';

    const link = createFormNode(initialFormData);
    const linkContent = useLink(link);

    const mockLinkContent = {
      value: new Reference('I am a form'),
      errors: null,
    };

    expect(linkContent).toMatchObject(mockLinkContent);
  });
});
