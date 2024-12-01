const AppStats = () => {
    return (
      <div className=' py-16 '>
        {/* Stats Section */}
        <h2 className='text-center mb-7  text-muted-foreground mx-auto text-xl font-semibold'>
          App Stats
        </h2>

        <div className='flex justify-center gap-2 md:space-x-8 mb-16 flex-wrap'>
          <div className='bg-transparent border text-black dark:text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>USERS</h4>
            <p className='text-3xl font-bold'>2000+</p>
          </div>

          <div className='bg-transparent border text-black dark:text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>INSTRUCTORS</h4>
            <p className='text-3xl font-bold'>15+</p>
          </div>

          <div className='bg-transparent border text-black dark:text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>LEARNERS</h4>
            <p className='text-3xl font-bold'>500K+</p>
          </div>

          <div className='bg-transparent border text-black dark:text-white text-center px-8 py-6 rounded-lg shadow-md'>
            <h4 className='text-sm font-semibold mb-2'>COURSES</h4>
            <p className='text-3xl font-bold'>10+</p>
          </div>
        </div>
      </div>
    );
}
 
export default AppStats;