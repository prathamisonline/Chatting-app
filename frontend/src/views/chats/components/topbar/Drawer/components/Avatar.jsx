import { UserDetailsState } from "../../../../../../states/theme";
import { useRecoilValue } from "recoil";

const Avatar = () => {
  const userDetails = useRecoilValue(UserDetailsState);
  return (
    <div>
      <div className="avatar">
        <div className="w-16 ring-primary ring-offset-base-100  rounded-full ring ring-offset-2">
          <img src={userDetails?.profilePic} alt="profilePic" />
        </div>
      </div>
      <div className="font-h1">{userDetails?.fullname}</div>
    </div>
  );
};

export default Avatar;
