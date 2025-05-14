import { getTranslations } from 'next-intl/server';

export const Hello = async () => {
  const t = await getTranslations('Dashboard');

  return (
    <>
      <p>
        {`👋 `}
        {t('hello_message', { email: 'Guest' })}
      </p>
      <p>
        {t.rich('alternative_message', {
          url: () => (
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="#"
            >
              Learn more about our services
            </a>
          ),
        })}
      </p>
    </>
  );
};