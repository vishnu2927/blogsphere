import { Button, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { HiMail } from 'react-icons/hi';

export default function CallToAction() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className='flex flex-col md:flex-row border border-teal-500 p-6 md:p-8 justify-between items-center rounded-2xl bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-slate-800/50 dark:via-slate-800/30 dark:to-slate-900/50 backdrop-blur-md shadow-xl gap-6'>
      <div className='flex-1 flex flex-col text-left max-w-lg'>
        <h2 className='text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-2'>
          Stay Ahead of the Curve
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-4'>
          Subscribe to our developer newsletter and get the latest insights, tutorials, and templates delivered straight to your inbox weekly.
        </p>
        {!subscribed ? (
          <form onSubmit={handleSubscribe} className='flex flex-col sm:flex-row gap-3 w-full'>
            <div className='flex-1'>
              <TextInput
                type='email'
                placeholder='Enter your email address'
                required
                icon={HiMail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full'
              />
            </div>
            <Button
              type='submit'
              gradientDuoTone='purpleToPink'
              className='transform hover:scale-105 transition-transform duration-200 shadow-md font-semibold'
            >
              Subscribe
            </Button>
          </form>
        ) : (
          <div className='bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-xl p-4 text-teal-800 dark:text-teal-200 font-medium text-sm animate-fade-in'>
            🎉 Thank you for subscribing! Check your inbox for the welcome guide.
          </div>
        )}
      </div>
      <div className='flex-shrink-0 w-full md:w-auto flex justify-center items-center'>
        <div className='relative w-48 h-48 flex justify-center items-center bg-indigo-100/35 dark:bg-slate-700/30 rounded-full border border-indigo-200/50 dark:border-slate-700/50 shadow-inner'>
          <HiMail className='w-24 h-24 text-indigo-500/80 dark:text-teal-400/80 drop-shadow-md animate-pulse' />
        </div>
      </div>
    </div>
  );
}
