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

export const convertImageToBase64 = (file: File): Promise<string>  =>{
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
  });
}

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64.split(',')[1]); // Remove the data URI scheme
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}