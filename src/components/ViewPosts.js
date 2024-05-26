import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPost } from '../slice/UploadSlice'
import Navbar from './Navbar';
import img2 from '../ui/images/thin.jpg'
import { createPayment, getSecretKey, verifyPayment } from '../slice/PaymentSlice';
import jwtDecode from 'jwt-decode';
import { getUser } from '../slice/SignupSlice';
import { useNavigate } from 'react-router-dom';

function ViewPosts() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [posts, setPosts] =useState([])
    const [revealedImage, setRevealedImage] = useState(null);
    const [unlocked, setUnlocked] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);


// eslint-disable-next-line
    useEffect(() => {

        getAllPosts()
        getUserData()

      // eslint-disable-next-line
    },[])

    // eslint-disable-next-line
    useEffect(() => {
    },[unlocked, filteredPosts])

    const getAllPosts = () => {
        dispatch(getPost()).then((result) => {
            setPosts(result?.payload?.data) 
            setFilteredPosts(result?.payload?.data)       
        })
    }

    const getUserData = async() => {
      const userDetails = getUserDetails();

      if(userDetails){


      const data = {
        userId : userDetails._id
      }
      dispatch(getUser(data)).then((result) => {
        setUnlocked(result.payload.data.unlocked)

      })
    }
    }
  

    const handleRevealPicture = (post) => {
      const isLoggedIn = getUserDetails();
      if(isLoggedIn){

        if(unlocked.includes(post.id)){
        const url = "http://localhost:6001/image/get-image/" + post.id;
        setRevealedImage(url);
      } else {      
      getKey(post);
      }

    } else {
      alert("Please Login First")
      navigate('/signin')
    }
       
      
    }


    const getKey = (post) => {
      dispatch(getSecretKey()).then((result) => {
        checkout(result.payload.data.key, post.price, post.id)
      })
    }

    const getUserDetails = () => {
      const token = localStorage.getItem("user")
      if(token){
        const decoded = jwtDecode(token);
        return decoded.userDetails;
      } 
      return false;
    }

    

    const checkout = (key, price, postId) => {
      const data = {
        price: price
      }
      dispatch(createPayment(data)).then((result) => {

        const paymentInfo = result.payload.data;
        const options = {
          key_id: key, // Enter the Key ID generated from the Dashboard
          amount: paymentInfo.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: `Post `,
          description: 'Test Transaction',
          image: 'https://example.com/your_logo',
          order_id: paymentInfo.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response) {
            const userData = getUserDetails();
            const data = {
                orderCreationId: paymentInfo.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                postId: postId,
                userId: userData._id
            };
            dispatch(verifyPayment(data)).then((result) => {
             window.location.reload()
            })

          },
          //callback_url:'http://localhost:6001/payment/payment-verification',
          theme: {
            color: '#3399cc',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function (response) {
          alert(response.error.description);
        });
      })
    }

    const filterPosts = (type) => {
      const filteredPosts =  posts.filter(post => post.type === type);
      setFilteredPosts(filteredPosts)
    }

   


  return (
    <div className='h-screen'>
      <Navbar/>
      <div className='flex mt-[5%] ml-[1%] mr-[1%] h-[7%]'>
       <button
        onClick={(e) => filterPosts("Semi-Exclusive")}
        className='text-fontwhite font-bold w-[50%] bg-custom-gradient rounded-3xl mr-1'> Semi Exclusive 🌶️</button>
       <button 
       onClick={(e) => filterPosts("Fully-Exclusive")}
       className='text-fontwhite font-bold w-[50%] bg-purple-gradient rounded-3xl'> Fully Exclusive 😈</button>
      </div>
      <p className='text-fontwhite mt-[2%] text-2xl'> Welcome to Akshara-Exclusive ❤️‍🔥</p>
      <div className='mt-[2%] text-fontwhite bg-black h-[5%] flex justify-center items-center font-xs font-light'>
        <p className=''>Pics you will never find on internet are Here!!</p>
      </div>

    <div className='flex flex-col justify-center items-center'>
      {filteredPosts && filteredPosts.map((post) => (
        <div key={post.id} className=' flex-col mt-[5%] text-fontwhite border h-[10%] border-fontwhite bg-black sm:w-[80%] md:w-[60%] lg:w-[30%]'>

        <div className='flex mt-[2%]'>
          <p className='text-xs m-[2%]'>{post.description} - ({post.type})</p>
        </div>
        <div className='bg-black '>
            <img src={revealedImage === "http://localhost:6001/image/get-image/" + post.id ? revealedImage : img2} alt='no'className={`object-contain ${revealedImage === "http://localhost:6001/image/get-image/" + post.id ? '' : 'blur-3xl'}`}/>
        </div>
        <div className='h-10 mt-[50%] '>
          <button className={`w-[100%] h-[90%] ${unlocked.includes(post.id) ? 'bg-green' : 'bg-red'} `} onClick={()=>handleRevealPicture(post)} >{unlocked.includes(post.id) ? "Reveal (Unlocked)" : `Reveal for ${post.price}/-`} </button>
        </div>
      </div>
      ))}
      </div>
    </div>
  )
}

export default ViewPosts
