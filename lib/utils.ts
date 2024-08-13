export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const handleError = (message: string, error: unknown): void => {
  console.error(`🚨 ${message}`, error);
};

export const formatPriceInLKR = (number: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(number);
};

export const formatDate = (date: string) => {
  if (date) {
    const dt = new Date(date);
    const month =
      dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
    return day + '/' + month + '/' + dt.getFullYear();
  }
  return '';
};

export const returnCommonObject = (existingObject: any, currentObject: any) => {
  const commonObject: any = {};

  for (const key in currentObject) {
    if (
      currentObject.hasOwnProperty(key) &&
      existingObject.hasOwnProperty(key)
    ) {
      commonObject[key] = currentObject[key];
    }
  }

  return commonObject;
};

export const findField = (formFields: any, findString: string) => {
  for (const fieldGroup of formFields) {
    if (Array.isArray(fieldGroup.fields)) {
      const field = fieldGroup.fields.find(
        (field: any) => field.id === findString
      );

      if (field) {
        return field;
      }
    }
  }

  return null;
};
