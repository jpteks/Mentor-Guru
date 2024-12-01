import CardCourse from "../components/Card";

export default function Courses() {
  return (
    <>  
      <div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-2 px-4 pt-4'>
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
        </div>
      </div>
    </>
  );
}
