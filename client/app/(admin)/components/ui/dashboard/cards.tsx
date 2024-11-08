const iconMap = {
  payments: "💳",
  subscribers: "👥",
  users: "👤",
  active_users: "📊",
};

export default function CardWrapper() {
  return (
    <>
      <Card title='Total Payments' value={"10,000FCFA"} type='payments' />
      <Card title='Subscribers' value={20} type='subscribers' />
      <Card title='Total Users' value={500} type='users' />
      <Card title='Active Users' value={61} type='active_users' />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "payments" | "subscribers" | "users" | "active_users";
}) {
  const Icon = iconMap[type];

  return (
    <div className='rounded-xl bg-gray-50 p-4 shadow-sm'>
      <div className='flex items-center'>
        {Icon && (
          <span className='h-6 w-6 text-lg flex items-center justify-center text-gray-700'>
            {Icon}
          </span>
        )}
        <h3 className='ml-2 text-sm font-medium text-black'>{title}</h3>
      </div>
      <p className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl text-black'>
        {value}
      </p>
    </div>
  );
}
