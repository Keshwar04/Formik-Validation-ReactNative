import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Styles } from './src/Styles/AppStyle';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  mobNo: Yup.string().min(10, 'must be 10 digits').max(10, 'give 10 digits only').matches(/^([0-9)]{10})+$/, 'must be number only').required('required'),
  email: Yup.string().email('Invalid email').required('Required'),
  pwd: Yup.string().matches(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#]).{5,})+$/, 'Enter Valid pwd format').required('required'),
  confirmPwd: Yup.string().oneOf([Yup.ref('pwd')], 'pwd does not match').required('required')
});

const App = () => {
  return (
    <Formik initialValues={{
      name: '',
      mobNo: '',
      email: '',
      pwd: '',
      confirmPwd: '',
    }}
      validationSchema={SignupSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}
    >
      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={Styles.container} >
            <TextInput style={Styles.input} placeholder='Name' value={values.name} onChangeText={handleChange('name')} onBlur={() => setFieldTouched('name')} />
                  {touched.name && errors.name && (<Text>{errors.name}</Text>)}
            <TextInput style={[Styles.input]} placeholder='Mob No' value={values.mobNo} onChangeText={handleChange('mobNo')} onBlur={() => setFieldTouched('mobNo')} />
                  {errors.mobNo && (<Text>{errors.mobNo}</Text>)}
            <TextInput style={Styles.input} placeholder='Email' value={values.email} onChangeText={handleChange('email')} onBlur={() => setFieldTouched('email')} />
                  {touched.email && errors.email && (<Text>{errors.email}</Text>)}
            <TextInput style={Styles.input} placeholder='pwd' value={values.pwd} onChangeText={handleChange('pwd')} onBlur={() => setFieldTouched('pwd')} />
                  {touched.pwd && errors.pwd && (<Text>{errors.pwd}</Text>)}
            <TextInput style={Styles.input} placeholder='Confirm pwd' value={values.confirmPwd} onChangeText={handleChange('confirmPwd')} onBlur={() => setFieldTouched('confirmPwd')} />
                  {touched.confirmPwd && errors.confirmPwd && (<Text>{errors.confirmPwd}</Text>)}
            <TouchableOpacity style={[Styles.button, { opacity: isValid ? 0.6 : 1 }]} disabled={!isValid} onPress={handleSubmit} >
              <Text style={Styles.text} >Sign in</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}

    </Formik>
  )
}

export default App
