"use client";
import { useState } from 'react';
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

 function ProfileForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
    
  const handleSubmit = async(e) => {
    e.preventDefault();
    const user=await fetch('/api/kinde').then((res) => res.json());
    console.log(user);
    console.log(user.user);
    var email=await user.user.email;
    console.log(email);
    await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, phoneNumber }),
    });
    alert("Profile Created Successfully");
    onSubmit();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h1 className='text-red-600'> FILL CAREFULLY YOU CANNOT CHANGE LATER !</h1>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Save Profile</Button>
    </form>
  );
}

export default ProfileForm;