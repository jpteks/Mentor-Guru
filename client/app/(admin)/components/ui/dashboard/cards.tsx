const iconMap = {
  payments: "💳",
  subscribers: "👥",
  users: "👤",
  active_users: "📊",
};

export default function CardWrapper({
  totalSubscribers = 1,
  totalUsers = 2,
}: {
  totalSubscribers: number;
  totalUsers: number;
}) {
  return (
    <>
      <Card title='Total Payments' value={"10,000FCFA"} type='payments' />
      <Card title='Subscribers' value={totalSubscribers} type='subscribers' />
      <Card title='Total Users' value={totalUsers - 1} type='users' />
      <Card title='Active Users' value={1} type='active_users' />
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
