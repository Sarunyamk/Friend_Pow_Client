
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../stores/AuthStore'
import validateLogin from './../../utils/LoginValidate';
import ForgetPassword from './ForgetPassword';
import LoginGoogle from './LoginGoogle';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Play } from "lucide-react"

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';



export default function Login() {

  //change lang ห้ามมลบ
  const { t } = useTranslation();

  const [form, setForm] = useState({

    email: '',
    password: ''
  })

  const [formatError, setFormatError] = useState({})

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  const isOpen = useAuthStore((state) => state.isOpen);
  const setIsOpen = useAuthStore((state) => state.setIsOpen);
  const actionLogin = useAuthStore((state) => state.actionLogin)
  const navigate = useNavigate()

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const role = await actionLogin(form)
      toast.success(t('login.toastLogin'));
      if (role) {

        roleRedirect(role)
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }

  }

  const roleRedirect = (role) => {

    const checkRole = role.data.user.user.role

    if (checkRole === "ADMIN") {

      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  return (
    <div className='mx-auto rounded-md flex flex-col justify-center items-center gap-4'>

      <div className=" w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4 md:p-8">
        <Card className="my-10 w-full max-w-4xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Login Form Section */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 rounded-full bg-purple-500" />
                  <h1 className="text-2xl text-purple-500">{t("login.title")}</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">{t("register.emailLabel")} :</label>
                    <Input type="email" placeholder="abc@xyz.com" name="email" onChange={handleChange} value={form.email} />
                    {formatError && <p className='text-red-500 text-xs'>{formatError.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">{t("register.passwordLabel")} :</label>
                    <Input type="password" placeholder={t("register.passwordLabel")} name="password" onChange={handleChange} value={form.password} />
                    {formatError && <p className='text-red-500 text-xs'>{formatError.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">

                    <p onClick={() => setIsOpen(!isOpen)} className=' cursor-pointer underline hover:text-yellow'>{t("login.forgetPassword")}</p>
                    {isOpen && <ForgetPassword />}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    {t("login.loginButton")}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <div className="px-2 bg-white text-gray-500">{t("login.connectWith")}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">


                    <LoginGoogle />

                  </div>

                  <div className="text-center text-sm text-gray-600">
                    {t("login.noAccount")}{" "}
                    <Button variant="link" className="text-purple-500 p-0" onClick={() => navigate('/register')}>
                      {t("register.signUpButton")}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right Content Section */}
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-l-[8rem]">
                  <div className="p-8 text-white space-y-6 mt-20">
                    <h2 className="text-4xl font-bold">Friendly Pow</h2>
                    <p className="text-sm opacity-90">
                      {t("login.rightContentText")}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>






  )
}
