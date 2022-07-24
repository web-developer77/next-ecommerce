export function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone'
  }

  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS'
  }

  return 'unknown'
}

export function formatPrice(amount: number) {
  if (amount) {
    return amount
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export function getRouterParamValue(
  param: any,
  format?: string,
  defaultValue?: any,
) {
  if (format === 'number') {
    return param
      ? parseInt(Array.isArray(param) ? param[0] : param)
      : defaultValue || null
  } else {
    return param
      ? Array.isArray(param)
        ? param[0]
        : param
      : defaultValue || null
  }
}
