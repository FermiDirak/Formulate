"use strict";
// import { createFormNode, FormNode } from './datastructures/formNode';
// /**
//  * @description
//  * An HOC for using Formulate
//  *
//  * @example
//  * const initialForm = {
//  *   name: 'jack black',
//  *   profile: {
//  *     nick: 'dirak',
//  *     favoriteSign: 'peace',
//  *   }
//  * };
//  *
//  * const UserForm = (formData, onSubmit) => (
//  *   <form> ... </form>
//  * )
//  *
//  * export default withF1(intialForm, onSubmit)(UserForm);
//  */
Object.defineProperty(exports, "__esModule", { value: true });
// import * as React from 'react';
// type InjectedProps<T> = {
//   formData: FormNode<T>
// }
// type WithF1Props<T> = {
//   formData: T,
//   onSubmit: (formValue: T) => void,
// }
// type WithF1Return<T, PROPS> = (
//   WrappedComponent: React.ComponentType<PROPS & InjectedProps<T>>
// ) => React.ReactNode;
// /** An HOC for using Formulate */
// const withF1 = <T, PROPS>(
//   initialForm: T,
//   onSubmit: (formValue: T) => void,
// ): WithF1Return<T, PROPS> => {
//   const callback = (
//     WrappedComponent: React.ComponentType<PROPS & InjectedProps<T>>
//   ) => {
//     class F1Component extends React.Component<PROPS & InjectedProps<T>> {
//       state = {
//         formData: createFormNode(initialForm),
//       }
//       render() {
//         return (
//           <WrappedComponent formData={this.state.formData} />
//         );
//       }
//     };
//     return F1Component;
//   };
//   return callback;
// };
const withF8 = 3;
exports.default = withF8;
//# sourceMappingURL=withF8.js.map