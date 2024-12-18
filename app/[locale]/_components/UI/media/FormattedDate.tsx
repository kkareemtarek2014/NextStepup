"use client";

import { useLocale } from "next-intl";

const FormattedDate = ({
  date,
  content,
}: {
  date: Date | undefined;
  content?: any[];
}) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const transformedDate =
    date &&
    new Date(date).toLocaleDateString(locale, {
      month: "short",
      year: "numeric",
    });

  return (
    <span className="text-base font-medium text-primary items-center">
      News- {transformedDate}
    </span>
  );
};

export default FormattedDate;
