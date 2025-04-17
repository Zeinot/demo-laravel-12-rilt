import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Todos', href: '/dashboard' },
  { name: 'Dashboard', href: '/dashboard' }
];
const features = [
  {
    name: 'Todo Management',
    description:
      'Create, update, and organize your todos with an intuitive interface.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure Access',
    description:
      'Your todos are private and secure with Laravel authentication system.',
    icon: LockClosedIcon,
  },
  {
    name: 'Mobile-Friendly Design',
    description:
      'Access your todos on any device with a responsive, mobile-first interface.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Filtering Options',
    description:
      'Filter todos by status and priority to quickly find what you need.',
    icon: FingerPrintIcon,
  },
];
const tiers = [
  {
    name: 'Todo App',
    id: 'tier-free',
    href: '/register',
    priceMonthly: 'Free',
    description: 'All the essential todo management features you need.',
    features: [
      'Todo creation and management',
      'Status and priority filtering',
      'Mobile-friendly interface',
      'Secure authentication',
      'Dashboard statistics'
    ],
    mostPopular: true,
  },
];
const faqs = [
  {
    id: 1,
    question: 'Is my data secure?',
    answer:
      'Yes. We use Laravel authentication to ensure your todos are only accessible to you.',
  },
  {
    id: 2,
    question: 'Can I use the app on mobile?',
    answer:
      'Yes! The app is fully responsive, offering a good experience on mobile, tablet, and desktop devices.',
  },
  {
    id: 3,
    question: 'How do I get started?',
    answer:
      'Simply register for a free account and start managing your todos right away.',
  },
  {
    id: 4,
    question: 'What features are available?',
    answer:
      'You can create, view, edit, and delete todos, filter them by status and priority, and see statistics on your dashboard.',
  },
];


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Laravel Todo App</span>
              <img
                alt="Laravel Todo App"
                src="/logo.svg"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href={route('login')} className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Laravel Todo App</span>
                <img
                  alt="Laravel Todo App"
                  src="/logo.svg"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href={route('login')}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                  Organize your tasks with the Laravel Todo App
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  A clean, mobile-friendly todo dashboard built with Laravel 12 and React. Filter by status and priority, track your progress, and manage your tasks efficiently.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href={route('register')}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                  <Link href={route('login')} className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                    Log in <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="mx-auto -my-2 rounded-xl bg-gray-900/5 py-2 px-2 ring-1 ring-gray-900/10 ring-inset lg:-my-4 lg:rounded-2xl lg:py-4 lg:px-4 max-w-3xl">
                  <img
                    alt="App screenshot"
                    src="/storage/assets/img.png"
                    width={1200}
                    height={700}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Features</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              Everything you need to manage your todos
            </p>
            <p className="mt-6 text-lg/8 text-pretty text-gray-600">
              Built for productivity, collaboration, and performance. Designed with a mobile-first mindset and modern UI best practices.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="size-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Pricing section */}
        <div className="py-24 sm:pt-48">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base/7 font-semibold text-indigo-600">Free Todo App</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                Simple, effective, and free
              </p>
              <p className="mt-6 text-lg/8 text-pretty text-gray-600">
                Our todo app is completely free to use with all features included.
              </p>
            </div>
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 mx-auto w-full max-w-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3
                        id={tier.id}
                        className={classNames(
                          tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                          'text-lg/8 font-semibold',
                        )}
                      >
                        {tier.name}
                      </h3>
                      {tier.mostPopular ? (
                        <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600">
                          Most popular
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm/6 text-gray-600">{tier.description}</p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-4xl font-semibold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                      {tier.priceMonthly !== 'Free' && (
                        <span className="text-sm/6 font-semibold text-gray-600">/month</span>
                      )}
                    </p>
                    <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={tier.href === '/register' ? route('register') : tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-500'
                        : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300',
                      'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    )}
                  >
                    {tier.priceMonthly === 'Free' ? 'Start free' : 'Buy plan'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mx-auto max-w-2xl px-6 pb-8 sm:pt-12 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pb-32">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-20 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className="text-base/7 font-semibold text-gray-900 lg:col-span-5">{faq.question}</dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base/7 text-gray-600">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div className="relative -z-10 mt-32 px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:top-auto sm:right-[calc(50%-6rem)] sm:bottom-0 sm:translate-y-0 sm:transform-gpu sm:justify-end"
          >
            <div
              style={{
                clipPath:
                  'polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)',
              }}
              className="aspect-1108/632 w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Boost your productivity. Start using the Laravel Todo App today.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={route('register')}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Get started
              </Link>
              <Link href={route('login')} className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                Log in <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10">
              <img
                alt="App screenshot"
                src="/storage/assets/img.png"
                width={800}
                height={500}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10 mx-auto"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-8">
        <div className="border-t border-gray-900/10 py-16">
          <div className="text-center">
            <Link href="/" className="inline-block cursor-pointer">
              <img
                alt="Laravel Todo App"
                src="/logo.svg"
                className="h-9 mx-auto"
              />
            </Link>
            <p className="mt-6 text-sm text-gray-600">
              © {new Date().getFullYear()} Laravel Todo App. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
