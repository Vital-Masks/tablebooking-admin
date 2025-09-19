"use server";
const ENDPOINT = process.env.API_ENDPOINT;

export const login = async (data: any) => {
  try {
    const body = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const res = await fetch(`${ENDPOINT}/auth/login`, requestOptions);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        result: result,
      };
    }

    return { error: result.status };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed" };
  }
};

export const verifyOTP = async (data: any) => {
  try {
    const body = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const res = await fetch(`${ENDPOINT}/auth/verify-otp`, requestOptions);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        result: result,
      };
    }

    return { error: result.message };
  } catch (error) {
    console.error("Verify OTP error:", error);
    return { error: "Verify OTP failed" };
  }
};

export const resendOTP = async (data: any) => {
  try {
    const body = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const res = await fetch(`${ENDPOINT}/auth/resend-otp`, requestOptions);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        result: result,
      };
    }

    return { error: result.message };
  } catch (error) {
    console.error("Resend OTP error:", error);
    return { error: "Resend OTP failed" };
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const body = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const res = await fetch(`${ENDPOINT}/auth/forgot-password`, requestOptions);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        result: result,
      };
    }

    return { error: result.message || "Failed to send reset email" };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { error: "Failed to send reset email" };
  }
};

export const resetPassword = async (data: any) => {
  try {
    const body = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const res = await fetch(`${ENDPOINT}/auth/reset-password`, requestOptions);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        result: result,
      };
    }

    return { error: result.message || "Failed to reset password" };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Failed to reset password" };
  }
};
