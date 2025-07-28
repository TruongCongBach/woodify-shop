'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@woodify/ui/shadcn-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@woodify/ui/shadcn-ui/card';
import { Input } from '@woodify/ui/shadcn-ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@woodify/ui/shadcn-ui/form';
import { GoogleIcon } from '@woodify/ui/icons/GoogleIcon';
import { FacebookIcon } from '@woodify/ui/icons/FacebookIcon';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  remember: z.boolean().optional(),
});

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setError('Tài khoản của bạn không có quyền truy cập. Vui lòng liên hệ với admin để được cấp quyền.');
    }
  }, [searchParams]);

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/dashboard/categories'
      });

      if (result?.error) {
        if (result.error === 'unauthorized') {
          setError('Tài khoản của bạn không có quyền truy cập. Vui lòng liên hệ với admin để được cấp quyền.');
        } else {
          setError('Invalid email or password. Please try again.');
        }
        setIsLoading(false);
      } else if (result?.ok) {
        router.push('/dashboard/categories');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook') => {
    try {
      setError(null);
      setSocialLoading(provider);

      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: '/dashboard/categories'
      });

      if (result?.error) {
        if (result.error === 'unauthorized') {
          setError('Tài khoản của bạn không có quyền truy cập. Vui lòng liên hệ với admin để được cấp quyền.');
        } else {
          setError(`Failed to sign in with ${provider}. Please try again.`);
        }
        setSocialLoading(null);
      } else if (result?.ok) {
        router.push('/dashboard/categories');
      }
    } catch (err) {
      setError(`An error occurred while signing in with ${provider}.`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
        <CardHeader className="space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Sign in to your account to continue
            </CardDescription>
          </div>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          disabled={isLoading || socialLoading !== null}
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          {...field}
                          disabled={isLoading || socialLoading !== null}
                          className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                          tabIndex={-1}
                          disabled={isLoading || socialLoading !== null}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 text-gray-600">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={field.value}
                          onChange={field.onChange}
                          disabled={isLoading || socialLoading !== null}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 text-white font-medium"
                disabled={isLoading || socialLoading !== null}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>

        <div className="px-6 pb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              onClick={() => handleSocialSignIn('google')}
              disabled={isLoading || socialLoading !== null}
            >
              {socialLoading === 'google' ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5 mr-2" />
                  <span className="font-medium">Google</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="h-12 border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              onClick={() => handleSocialSignIn('facebook')}
              disabled={isLoading || socialLoading !== null}
            >
              {socialLoading === 'facebook' ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <FacebookIcon className="w-5 h-5 mr-2 text-[#1877F2]" />
                  <span className="font-medium">Facebook</span>
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

