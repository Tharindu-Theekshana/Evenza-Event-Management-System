import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Users, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login, register as registerUser } from "../services/AuthService";


type UserType = 'customer' | 'organizer';

interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  userType?: UserType;
}

// ✅ Yup Schemas
const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const registerSchema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  userType: yup.mixed<UserType>().oneOf(["customer", "organizer"]).required("User type is required"),
});

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  register: any;
  error?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  icon: Icon,
  register,
  error,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword
}) => (
  <div className="relative">
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900/60 w-5 h-5" />
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full pl-10 pr-${showPasswordToggle ? '12' : '4'} py-3 border-2 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-900/20 ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-blue-900/20 focus:border-blue-900/40'
        }`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900/60 hover:text-blue-900 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1 ml-1 animate-in slide-in-from-left-2 duration-200">
        {error}
      </p>
    )}
  </div>
);

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>('customer');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(isSignUp ? registerSchema : loginSchema),
    defaultValues: {
      userType: 'customer'
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (isSignUp) {
        
        const response = await registerUser(data);

        alert(response.message);
        setIsSignUp(!isSignUp);
        reset();
      } else {
        
        const response = await login(data);
        console.log(response)
        if(response.token){

          localStorage.clear();
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('isLoggedIn', response.loggedIn);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('name',response.name);
      }; 
        alert(response.message);
        reset()
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
    setValue('userType', type);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setSelectedUserType('customer');
    setShowPassword(false);
    setShowConfirmPassword(false);
    reset();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-2xl mb-4 shadow-lg">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-blue-900/70">
              {isSignUp
                ? "Sign up to get started with your account"
                : "Sign in to access your account"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {isSignUp && (
                <>
                  {/* User Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-blue-900/80 mb-3">
                      I want to join as:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleUserTypeSelect('customer')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedUserType === 'customer'
                            ? 'border-blue-900 bg-blue-900/5 shadow-lg'
                            : 'border-blue-900/20 bg-white/50 hover:border-blue-900/40'
                        }`}
                      >
                        <Users className={`w-6 h-6 mx-auto mb-2 ${
                          selectedUserType === 'customer' ? 'text-blue-900' : 'text-blue-900/60'
                        }`} />
                        <div className={`text-sm font-semibold ${
                          selectedUserType === 'customer' ? 'text-blue-900' : 'text-blue-900/70'
                        }`}>
                          Customer
                        </div>
                        <div className="text-xs text-blue-900/60 mt-1">
                          Book and attend events
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUserTypeSelect('organizer')}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedUserType === 'organizer'
                            ? 'border-blue-900 bg-blue-900/5 shadow-lg'
                            : 'border-blue-900/20 bg-white/50 hover:border-blue-900/40'
                        }`}
                      >
                        <Calendar className={`w-6 h-6 mx-auto mb-2 ${
                          selectedUserType === 'organizer' ? 'text-blue-900' : 'text-blue-900/60'
                        }`} />
                        <div className={`text-sm font-semibold ${
                          selectedUserType === 'organizer' ? 'text-blue-900' : 'text-blue-900/70'
                        }`}>
                          Organizer
                        </div>
                        <div className="text-xs text-blue-900/60 mt-1">
                          Create and manage events
                        </div>
                      </button>
                    </div>
                    {errors.userType && (
                      <p className="text-red-500 text-sm mt-1 ml-1 animate-in slide-in-from-left-2 duration-200">
                        {errors.userType.message}
                      </p>
                    )}
                  </div>

                  {/* Full Name */}
                  <InputField
                    type="text"
                    placeholder="Full Name"
                    icon={User}
                    register={register("name")}
                    error={errors.name?.message}
                  />
                </>
              )}

              {/* Email */}
              <InputField
                type="email"
                placeholder="Email Address"
                icon={Mail}
                register={register("email")}
                error={errors.email?.message}
              />

              {/* Password */}
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon={Lock}
                register={register("password")}
                error={errors.password?.message}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              {/* Confirm Password */}
              {isSignUp && (
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  icon={Lock}
                  register={register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                  showPasswordToggle={true}
                  showPassword={showConfirmPassword}
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-blue-900/20 text-blue-900 focus:ring-blue-900/20"
                    />
                    <span className="ml-2 text-blue-900/70">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-blue-900 hover:text-blue-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center justify-center">
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-900/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-blue-900/70">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="flex items-center justify-center px-4 py-3 bg-white/80 border border-blue-900/20 rounded-xl hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button 
                type="button"
                className="flex items-center justify-center px-4 py-3 bg-white/80 border border-blue-900/20 rounded-xl hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Toggle Mode */}
            <div className="text-center mt-6">
              <span className="text-blue-900/70">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-blue-900 hover:text-blue-700 font-semibold transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}