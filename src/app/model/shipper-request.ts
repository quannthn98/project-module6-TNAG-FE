import {User} from './user';
import {ShipperProfile} from './shipper-profile';

export interface ShipperRequest {
  id?: number;
  user: User;
  shipperProfile: ShipperProfile;
  status?: boolean;
}
