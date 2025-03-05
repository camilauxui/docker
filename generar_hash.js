import bcrypt from 'bcryptjs';

async function generarHash() {  
  const password = 'password1';  
  const saltRounds = 10; // El número de rondas de hashing  
  const hash = await bcrypt.hash(password, saltRounds);  
  console.log(`El hash de "${password}" es: ${hash}`);  
}  

generarHash();