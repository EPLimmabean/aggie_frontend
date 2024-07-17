import {Container, Col, Row, Card} from "react-bootstrap";
import StatsBar from '../../components/StatsBar';
import UserProfileTable from "../../components/user/UserProfileTable";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../api/users";
import { useParams } from "next/navigation";
import { useRouter } from 'next/router'
import {Groups, Session, Source, Tag, User} from "../../objectTypes";
import {AxiosError} from "axios";
import {compareIds} from "../../helpers";
import GroupTable from "../../components/group/GroupTable";
import React from "react";
import {getGroups} from "../api/groups";
import {getTags} from "../api/tags";
import {getSources} from "../api/sources";

interface IProps {
  session: Session | undefined;
}

const UserProfile = (props: IProps) => {
  const params = useParams();
  const router = useRouter();
  const userID = Array.isArray(params.id) ? params.id[0] : params.id;
  const userQuery = useQuery<User | undefined, AxiosError>({queryKey: ["user", params.id], queryFn: async () => getUser(userID)});
  if (userQuery.error?.response?.status === 401) router.push('/login');

  const groupsCreatorQuery = useQuery<Groups | undefined, AxiosError>({
    queryKey: ["group", {creator: userQuery.data ? userQuery.data._id : null}], 
    queryFn: async () => getGroups({creator: userQuery.data ? userQuery.data._id : null}),
    enabled: userQuery.isSuccess,
  });

  const groupsAssignedQuery = useQuery<Groups | undefined, AxiosError>({
    queryKey: ["group", { assignedTo: userQuery.data ? userQuery.data._id : null}], 
    queryFn: () => getGroups({assignedTo: userQuery.data ? userQuery.data._id : null}),
    enabled: userQuery.isSuccess,
  });

  const sourcesQuery = useQuery<Source[] | undefined, AxiosError>({queryKey: ["sources"], queryFn: getSources});
  if (sourcesQuery.error?.response?.status === 401) router.push('/login');

  const tagsQuery = useQuery<Tag[] | undefined, AxiosError>({queryKey: ["tags"], queryFn: getTags});
  if (tagsQuery.error?.response?.status === 401) router.push('/login');

  return (
      <div className={"mt-4"}>
        <Container fluid>
          <Row>
            <Col>
            </Col>
            <Col xl={9}>
              { userQuery.isSuccess && userQuery.data && props.session &&
                  <UserProfileTable user={userQuery.data} isCurrentUser={compareIds(userQuery.data, props.session)}/>
              }
              { userQuery.isSuccess && sourcesQuery.isSuccess && tagsQuery.isSuccess && groupsCreatorQuery.isSuccess && props.session &&
                  userQuery.data && tagsQuery.data && groupsCreatorQuery.data && sourcesQuery.data &&
                  <Container fluid className="mb-4">
                    <h3 className={"mb-4 mt-4"}>{compareIds(userQuery.data, props.session) ? "Your groups" : "Created groups" }</h3>
                    <Card>
                      <Card.Body className="p-0">
                        <GroupTable visibleGroups={groupsCreatorQuery.data.results} sources={sourcesQuery.data} users={[userQuery.data]} tags={tagsQuery.data}/>
                      </Card.Body>
                    </Card>
                  </Container>
              }
              { userQuery.isSuccess && sourcesQuery.isSuccess && tagsQuery.isSuccess && groupsAssignedQuery.isSuccess && props.session &&
                  userQuery.data && tagsQuery.data && groupsAssignedQuery.data && sourcesQuery.data &&
                  <Container fluid className="mb-4">
                    <h3 className={"mb-4 mt-4"}>Assigned Groups</h3>
                    <Card>
                      <Card.Body className="p-0">
                        <GroupTable visibleGroups={groupsAssignedQuery.data.results} sources={sourcesQuery.data} users={[userQuery.data]} tags={tagsQuery.data}/>
                      </Card.Body>
                    </Card>
                  </Container>
              }
            </Col>
            <Col>
              <div className="d-none d-xl-block">
                {/*<StatsBar/>*/}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default UserProfile;


