'use client';
import Image from 'next/image';
import styles from './styles/mainPage.module.css';
import { useRef, useState, useEffect } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white w-full 2xl:w-[60%] 2xl:mx-auto h-full`}>
      {/* Hero Section */}
      <div className={`${styles.hero}`}>

        <div className="relative md:h-screen h-[65vh] w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

          <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10 md:px-[8rem] px-6">
            <Image src="/netflix_logo.svg" width={100} height={50} alt="Netflix Logo" className="h-8" />
            <button className="bg-[#E50914] text-white px-4 py-2 rounded cursor-pointer" onClick={() => router.push("/login")}>Sign In</button>
          </header>

          <div className="relative z-10 text-center px-4">
            <h1 className="md:text-5xl text-3xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
            <h2 className="text-xl mb-8">Watch anywhere. Cancel anytime.</h2>
            <p className="text-xl mb-6">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="p-4 rounded bg-gray-800 bg-opacity-70 border border-gray-700 text-white w-full sm:w-96"
              />
              <button className="bg-red-600 text-white text-2xl font-bold px-8 py-3 rounded">Get Started &gt;</button>
            </div>
          </div>
        </div>

      </div >

      {/* Trending Curve Seperator */}

      <section className='box-border z-10'>
        <div className="box-border overflow-x-hidden relative z-10 h-[5rem]">
          <div className={`${styles.trendingSection}`}></div>
        </div>

        {/* Trending Videos */}
        <div className="pb-10 relative z-10 md:mx-[8rem] mx-[2rem] h-full box-border" >
          <h2 className="text-lg font-bold mb-4 h-full">Trending Now</h2>
          <div className='relative h-full'>
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className='absolute left-0 top-1/2 transform -translate-y-1/2 z-30 py-10 h-auto w-8 justify-center bg-[#1A1A1A] flex items-center rounded-full text-2xl cursor-pointer hover:bg-[#2A2A2A] transition-colors'
              >
                <MdNavigateBefore />
              </button>
            )}
            <ul
              ref={scrollRef}
              className='flex gap-4 items-center overflow-y-clip overflow-x-scroll box-border scroll-smooth'
              style={{ scrollbarWidth: 'none' }}
              onScroll={checkScrollButtons}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <li key={i} className='flex-shrink-0 relative hover:scale-105 transition-transform duration-300'>
                  <Image className='w-[10rem]' src={`/trending-vids/${i + 1}.webp`} alt={`Trending ${i + 1}`} width={100} height={100} />
                  <p className={`${styles.numberStroke} absolute bottom-2 text-6xl z-20`} data-number={i + 1}>{i + 1}</p>
                </li>
              ))}
            </ul>
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className='absolute right-0 top-1/2 transform -translate-y-1/2 z-30 py-10 h-auto w-8 justify-center bg-[#1A1A1A] flex items-center rounded-full text-2xl cursor-pointer hover:bg-[#2A2A2A] transition-colors'
              >
                <MdNavigateNext />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Reasons to Join */}
      <section className='md:p-12 px-4 py-8'>
        <h2 className="text-lg font-semibold mb-4 h-full">More Reasons to Join</h2>

        <div className={`${styles.reason2join} relative mt-4 px-6 py-4 rounded-2xl`}>
          <h1 className='text-lg font-bold'>Enjoy on your TV</h1>
          <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          <div className='flex justify-end'>
            <Image src={'/reason2watch/tv.svg'} width={70} height={70} alt={'TV'} />
          </div>
        </div>

        <div className={`${styles.reason2join} relative mt-4 px-6 py-4 rounded-2xl`}>
          <h1 className='text-lg font-bold'>Download your shows to watch offline</h1>
          <p>Save your favorites easily and always have something to watch.</p>
          <div className='flex justify-end'>
            <Image src={'/reason2watch/download.svg'} width={70} height={70} alt={'TV'} />
          </div>
        </div>

        <div className={`${styles.reason2join} relative mt-4 px-6 py-4 rounded-2xl`}>
          <h1 className='text-lg font-bold'>Watch everywhere</h1>
          <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          <div className='flex justify-end'>
            <Image src={'/reason2watch/party.svg'} width={70} height={70} alt={'TV'} />
          </div>
        </div>

        <div className={`${styles.reason2join} relative mt-4 px-6 py-4 rounded-2xl`}>
          <h1 className='text-lg font-bold'>Create profiles for kids</h1>
          <p>Send kids on adventures with their favorite characters in a space made just for them — free with your membership.</p>
          <div className='flex justify-end'>
            <Image src={'/reason2watch/kids.svg'} width={70} height={70} alt={'TV'} />
          </div>
        </div>

      </ section>

      {/* Frequently Asked Questions */}
      <section className="md:p-12 px-6 py-10">
        <h2 className="text-lg font-semibold mb-4 h-full">Frequently Asked Questions</h2>

        <ul>
          <li className='mb-2 px-2'>
            <input type="checkbox" id="faq1" className={styles.faqToggle} />
            <label htmlFor="faq1" className={styles.faqLabel}>
              <span>What is Netflix?</span>
              <Image src={'/icons/add.svg'} width={20} height={20} alt='toggle' className={styles.faqIcon} />
            </label>
            <div className={styles.faqContent}>
              <p>Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.</p>
              <p>{"You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"}</p>
            </div>
          </li>
          <li className='mb-2 px-2'>
            <input type="checkbox" id="faq2" className={styles.faqToggle} />
            <label htmlFor="faq2" className={styles.faqLabel}>
              <span>How much does Netflix cost?</span>
              <Image src={'/icons/add.svg'} width={20} height={20} alt='toggle' className={styles.faqIcon} />
            </label>
            <div className={styles.faqContent}>
              <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from R 59 to R 229 a month. No extra costs, no contracts.</p>
            </div>
          </li>
          <li className='mb-2 px-2'>
            <input type="checkbox" id="faq3" className={styles.faqToggle} />
            <label htmlFor="faq3" className={styles.faqLabel}>
              <span>Where can I Watch?</span>
              <Image src={'/icons/add.svg'} width={20} height={20} alt='toggle' className={styles.faqIcon} />
            </label>
            <div className={styles.faqContent}>
              <p>Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.</p>
              <p>{"You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."}</p>
            </div>
          </li>
          <li className='mb-2 px-2'>
            <input type="checkbox" id="faq4" className={styles.faqToggle} />
            <label htmlFor="faq4" className={styles.faqLabel}>
              <span>How do I cancel?</span>
              <Image src={'/icons/add.svg'} width={20} height={20} alt='toggle' className={styles.faqIcon} />
            </label>
            <div className={styles.faqContent}>
              <p>Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
            </div>
          </li>
          <li className='mb-2 px-2'>
            <input type="checkbox" id="faq5" className={styles.faqToggle} />
            <label htmlFor="faq5" className={styles.faqLabel}>
              <span>What can I watch on Netflix?</span>
              <Image src={'/icons/add.svg'} width={20} height={20} alt='toggle' className={styles.faqIcon} />
            </label>
            <div className={styles.faqContent}>
              <p>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
            </div>
          </li>
          <li className='mb-2 px-2'>
            <input type="checkbox" id="faq6" className={styles.faqToggle} />
            <label htmlFor="faq6" className={styles.faqLabel}>
              <span>Is Netflix good for kids?</span>
              <Image src={'/icons/add.svg'} width={20} height={20} alt='toggle' className={styles.faqIcon} />
            </label>
            <div className={styles.faqContent}>
              <p>The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.</p>
              <p>{"Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see."}</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Email */}
      <section className="px-12">
        <h2 className="text-lg mb-4 h-full text-center">Ready to watch? Enter your email to create or restart your membership.
        </h2>
        <div className='flex items-center justify-center gap-2'>
          <input type="email" placeholder='Email Address' aria-label='Email Address' className='w-[20rem] py-[0.5rem] px-[0.5rem] border-2 border-[#2F2F2F]' id='home-email' />
          <button className='bg-[#E50914] px-[2rem] py-[0.75rem] font-bold rounded-sm cursor-pointer'>Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-16 text-gray-400">
        <p>Questions? Call +27 73 110 8711</p>
        <div className="flex justify-start gap-4 mt-4">
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Account</a>
          <a href="#" className="hover:underline">Media Center</a>
        </div>
      </footer>
    </div >
  );
}
