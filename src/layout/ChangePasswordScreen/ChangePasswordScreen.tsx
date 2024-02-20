import { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import '../RegisterScreen/RegisterScreen.scss';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import logo from '../../assets/logo/logo_notext.svg';
import logotext from '../../assets/logo/logo.png';
import { Card } from 'primereact/card';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Password } from 'primereact/password';

const ChangePasswordScreen = () => {
  const toast: any = useRef(null);

  const handleReset = (values: any) => {
    console.log(values);
  };

  const formik: any = useFormik({
    initialValues: {
      username: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Tên đăng nhập không được bỏ trống')
        .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự')
        .max(20, 'Tên đăng nhập không được vượt quá 20 ký tự'),
      password: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .max(20, 'Mật khẩu không được vượt quá 20 ký tự'),
      newPassword: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .max(20, 'Mật khẩu không được vượt quá 20 ký tự'),
      confirmPassword: Yup.string()
        .required('Xác nhận mật khẩu là bắt buộc')
        .oneOf([Yup.ref('newPassword'), ''], 'Mật khẩu xác nhận phải khớp với mật khẩu đã nhập'),
    }),
    onSubmit: (values) => {
      // Omit confirmPassword from the submitted values
      const { confirmPassword, ...submittedValues } = values;
      console.log('Form submitted with values:', submittedValues);
      handleReset(values);
    },
  });

  const pwFooter = (
    <>
      <Divider />
      <p className='mt-2'>Kiến nghị</p>
      <ul className='pl-2 ml-2 mt-0 line-height-3'>
        <li>Ít nhất một chữ thường</li>
        <li>Ít nhất một chữ hoa</li>
        <li>Ít nhất một chữ số</li>
        <li>Tối thiểu 8 ký tự</li>
      </ul>
    </>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className='register-container flex w-100'>
        <div className='background-overlay'></div>
        <div className='logo-container p-4 hidden lg:block'>
          <Image alt='logo' src={logotext} height='100' />
        </div>
        <Card className='register-card'>
          <div className='header-container pb-4'>
            <div className='logo flex justify-content-start lg:hidden'>
              <Image alt='logo' src={logo} height='40' />
              <h3 className='m-0'>Artworkia</h3>
            </div>
            <h1>Đổi mật khẩu</h1>
            <span>Người dùng cũ?</span> <Link to={'/login'}>Đăng nhập</Link>
          </div>
          <div className='normal-register'>
            {/* Form begin */}
            <form onSubmit={formik.handleSubmit}>
              <div className='username-container'>
                {formik.touched.username && formik.errors.username ? (
                  <small className='p-error'>{formik.errors.username}</small>
                ) : null}
                <br />
                <InputText
                  id='username'
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Tên đăng nhập'
                  maxLength={20}
                />
              </div>
              <div className='password-container'>
                {formik.touched.password && formik.errors.password ? (
                  <small className='p-error'>{formik.errors.password}</small>
                ) : null}
                <br />
                <Password
                  id='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  footer={pwFooter}
                  placeholder='Mật khẩu'
                  toggleMask
                />
              </div>
              <div className='new-password-container password-container'>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <small className='p-error'>{formik.errors.newPassword}</small>
                ) : null}
                <br />
                <Password
                  id='newPassword'
                  name='newPassword'
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  footer={pwFooter}
                  placeholder='Mật khẩu mới'
                  toggleMask
                />
              </div>
              <div className='confirm-password-container'>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <small className='p-error'>{formik.errors.confirmPassword}</small>
                ) : null}
                <br />
                <Password
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  placeholder='Nhập lại mật khẩu'
                  onBlur={formik.handleBlur}
                  feedback={false}
                />
              </div>
              <Button label='Tiếp tục' type='submit' className='mt-3' disabled={!formik.isValid} />
            </form>
            {/* Form end */}
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChangePasswordScreen;
