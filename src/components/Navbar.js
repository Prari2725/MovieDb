// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import { searchMovies } from '../../redux/actions/movieActions';

// const NavbarContainer = styled.nav`
//   background-color: #0f0f1e;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
//   position: sticky;
//   top: 0;
//   z-index: 100;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 1rem;
//   }
// `;

// const Logo = styled(Link)`
//   color: #b245e9ff;
//   font-size: 1.5rem;
//   font-weight: bold;
//   text-decoration: none;
//   margin-right: 2rem;
//   letter-spacing: 1px;

//   @media (max-width: 768px) {
//     margin-bottom: 1rem;
//     margin-right: 0;
//   }
// `;

// const NavLinks = styled.div`
//   display: flex;
//   align-items: center;
//   flex-grow: 1;
//   justify-content: center;

//   @media (max-width: 768px) {
//     width: 100%;
//     justify-content: center;
//     margin-bottom: 1rem;
//   }
// `;

// // Use $active instead of isActive to make it a transient prop
// const NavLink = styled(Link)`
//   color: #fff;
//   text-decoration: none;
//   margin: 0 1rem;
//   padding: 0.5rem;
//   transition: all 0.3s ease;
//   font-size: 0.95rem;
//   position: relative;
//   font-weight: ${props => props.$active ? 'bold' : 'normal'};
  
//   &:after {
//     content: '';
//     position: absolute;
//     width: ${props => props.$active ? '100%' : '0'};
//     height: 2px;
//     bottom: 0;
//     left: 0;
//     background-color: #e94560;
//     transition: width 0.3s ease;
//   }

//   &:hover {
//     color: #e94560;
    
//     &:after {
//       width: 100%;
//     }
//   }

//   @media (max-width: 768px) {
//     margin: 0 0.5rem;
//     font-size: 0.9rem;
//   }
// `;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchForm = styled.form`
//   display: flex;
//   align-items: center;
//   background-color: #16213e;
//   border-radius: 4px;
//   padding: 0.2rem;
//   border: 1px solid #2a2a4a;
// `;

// const SearchInput = styled.input`
//   padding: 0.5rem 1rem;
//   border: none;
//   background-color: transparent;
//   color: #fff;
//   border-radius: 4px;
//   outline: none;
//   width: 180px;
//   font-size: 0.9rem;

//   &::placeholder {
//     color: #8a8a8a;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchButton = styled.button`
//   background-color: #e94560;
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   font-size: 0.9rem;

//   &:hover {
//     background-color: #c81e3f;
//   }
// `;

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       dispatch(searchMovies(searchTerm));
//       navigate(`/search?query=${searchTerm}`);
//     }
//   };

//   const checkActive = (path) => {
//     if (path === '/' && location.pathname === '/') return true;
//     if (path !== '/' && location.pathname.startsWith(path)) return true;
//     return false;
//   };

//   return (
//     <NavbarContainer>
//       <Logo to="/">MovieDB</Logo>
      
//       <NavLinks>
//         <NavLink to="/" $active={checkActive('/')}>
//           Popular
//         </NavLink>
//         <NavLink to="/top-rated" $active={checkActive('/top-rated')}>
//           Top Rated
//         </NavLink>
//         <NavLink to="/upcoming" $active={checkActive('/upcoming')}>
//           Upcoming
//         </NavLink>
//       </NavLinks>
      
//       <SearchContainer>
//         <SearchForm onSubmit={handleSearch}>
//           <SearchInput
//             type="text"
//             placeholder="Search movies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <SearchButton type="submit">Search</SearchButton>
//         </SearchForm>
//       </SearchContainer>
//     </NavbarContainer>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { searchMovies } from '../redux/actions/movieActions';

// ===== Colors & Styling =====
const NavbarContainer = styled.nav`
  background: linear-gradient(90deg, #fdfbfb 0%, #ebedee 100%);
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  color: #2c3e50;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 1px;

  &:hover {
    color: #16a085;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${props => (props.$active ? '#16a085' : '#2c3e50')};
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${props => (props.$active ? '600' : '400')};
  position: relative;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: ${props => (props.$active ? '100%' : '0')};
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #16a085;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #16a085;

    &:after {
      width: 100%;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 0.2rem 0.4rem;
  border: 1px solid #bbb;
  background-color: #fff;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  background-color: transparent;
  color: #2c3e50;
  outline: none;
  width: 180px;
  font-size: 0.95rem;

  &::placeholder {
    color: #888;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background-color: #16a085;
  color: white;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;

  &:hover {
    background-color: #13856b;
  }
`;

// ===== Component =====
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMovies(searchTerm));
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const checkActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <NavbarContainer>
      <Logo to="/">🎬 MovieDB</Logo>

      <NavLinks>
        <NavLink to="/" $active={checkActive('/')}>
          Popular
        </NavLink>
        <NavLink to="/top-rated" $active={checkActive('/top-rated')}>
          Top Rated
        </NavLink>
        <NavLink to="/upcoming" $active={checkActive('/upcoming')}>
          Upcoming
        </NavLink>
      </NavLinks>

      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
      </SearchContainer>
    </NavbarContainer>
  );
};

export default Navbar;
