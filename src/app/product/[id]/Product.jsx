import Image from 'next/image'
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { useEffect } from 'react'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import Loading from '@/app/components/Loading'


export default function Product({ _id,title, desc, img, category, price }) {
  const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(true)
    async function loadUserData() {
      console.log("loading user data IS RUNNING")
      const user=await fetch('/api/kinde').then((res) => res.json());
      console.log(user);
      var em="";
      if(user!==null&&user.user!==null)
        em=await user.user.email;
      console.log("EMAIL IN ITEMS.JSX",em);
      const data = await fetch('/api/user?email='+em).then((res) => res.json());
      console.log(data);
      if(data.data.length>0)
        setShow(data.data);
  
      setLoading(false);
  
    }
  function additem() {
    const item = { id:_id, category, title, price, img, desc, quantity: 1 };
    
    if (data?.length > 0) {
      const itemExists = data.some(i => i.id === id);
      if (itemExists) {
        alert("Item Already Added to Cart");
        return;
      }
    }
    const temp=[...data, item];
    setData(temp);
    localStorage.setItem("carttupa", JSON.stringify(temp));

    alert("Item Added to Cart");
  }
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <Card className="max-w-2xl my-3 mx-auto">
      {loading && <Loading />}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2">{category}</Badge>
            <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
          </div>
          <div className="text-2xl font-bold">₹{price}</div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={img}
            alt={title}
            fill
            className="object-contain rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className="text-muted-foreground">{desc}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {!show &&
                  <LoginLink variant="default" className="kindecart">Add to Cart</LoginLink>}
                  {show &&
                  <Button variant="default" onClick={additem}>Add to Cart</Button>}
        
          
      </CardFooter>
    </Card>
  )
}
