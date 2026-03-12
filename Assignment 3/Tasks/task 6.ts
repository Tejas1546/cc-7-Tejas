import { delay } from "../Tasks/task 5.ts";
type User = {
  id: number;
};

/**
 * the getUsers() return the object of the fetced user
 * @param delayTime a peset (2s) and configurable delay time
 * @returns the objects that are fetced from the given jsonplaceholer website
 */
export async function getUsers(delayTime = 2000): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users: User[] = await response.json();
  await delay(delayTime); //uses the delay() implimented for the previous task
  return users;
}

//console testing

const users = await getUsers();
console.log(users[1]);
