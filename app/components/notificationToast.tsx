import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default async function NotificationToast(placeName: string) {

  const MySwal = withReactContent(Swal)
  let timerInterval: string | number | NodeJS.Timeout | undefined;

  await MySwal.fire({
    icon: "success",
    title: "We tag " + placeName + " as a favorite place!",
    timer: 2000,
    // timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup()?.querySelector("b");
      if (timer) {
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 1000);
      }
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}
